const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { request, gql } = require("graphql-request");

const { BuildEmbed } = require("../../utils/BuildEmbed");

async function GetLeetcodeUser(interaction) {
    const username = interaction.options.getString("username");

    let embed = new MessageEmbed();
    let profile;
    let submitStats;
    let aboutMe;

    const query = gql `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    aboutMe
                    ranking
                    starRating
                    userAvatar
                }
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                        }
                    }
                }
            }
        `;

    const userData = await request("https://leetcode.com/graphql", query, {
        username
    });
    profile = userData.matchedUser.profile;
    submitStats = userData.matchedUser.submitStats.acSubmissionNum;
    aboutMe = profile.aboutMe ? profile.aboutMe : "No information available";

    embed = BuildEmbed(
        embed,
        {
            title: `${username}'s Leetcode profile`,
            url: `https://leetcode.com/${username}`,
            thumbnail: `${profile.userAvatar}`,
            fields : [
                { name : "About Me", value : `${aboutMe}`},
                { name : "Ranking 📈", value : `${profile.ranking}`, inline : true },
                { name : "Stars ⭐", value : `${profile.starRating}`, inline : true},
                { name : "Total Submissions", value : `${submitStats[0].count}`},
                { name : "Easy", value : `${submitStats[1].count}`, inline : true},
                { name : "Medium", value : `${submitStats[2].count}`, inline : true},
                { name : "Hard", value : `${submitStats[3].count}`, inline : true}
            ]
        }
    )
    
    await interaction.editReply({ embeds: [embed] });
}


async function GetLeetcodeDaily(interaction) {
    let embed = new MessageEmbed();
    let topicTags;

    const query = gql `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                link
                question {
                    acRate
                    difficulty
                    title
                    content
                    topicTags {
                        name
                        id
                    }
                }
            }
        }
    `

    let questionData = await request("https://leetcode.com/graphql", query);
    questionData = questionData.activeDailyCodingChallengeQuestion;

    topicTags = questionData.question.topicTags.map(tag => tag.name);
    
    embed = BuildEmbed(
        embed,
        {
            title: `${questionData.question.title}`,
            thumbnail: "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png",
            url: `https://leetcode.com${questionData.link}`,
            fields: [
                { name : "Difficulty", value : `${questionData.question.difficulty}`, inline : true},
                { name : "Acceptance Rate", value : `${Math.round(questionData.question.acRate)}%`, inline :true},
                { name : "Tags" , value : topicTags }
            ]
        }
    )

    await interaction.editReply({content: ":hourglass_flowing_sand: Here is today's challenge!", embeds: [embed] })
}


async function GetLeetcodeQuestion(interaction) {
    const limit = 50;

    let embed = new MessageEmbed();
    let categorySlug = "";
    let skip = 0;
    let filters = {};

    let questionData;
    let randQnNo;
    let randQnData;
    let difficulty;
    let topicTags;

    const query = gql `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters:  QuestionListFilterInput) {
        problemsetQuestionList : questionList(categorySlug: $categorySlug, limit : $limit, skip : $skip, filters: $filters) {
            total : totalNum
            questions : data {
                acRate
                difficulty
                freqBar
                frontendQuestionId : questionFrontendId
                title
                topicTags {
                    name
                    id
                }
            }
        }
    }`

    difficulty = interaction.options.getString("difficulty");
    if(difficulty) {
        switch(difficulty) {
            case "Easy" :
                filters.difficulty = "EASY";
                break;
            case "Medium" :
                filters.difficulty = "MEDIUM";
                break;
            case "Hard" : 
                filters.difficulty = "HARD";
                break;
        }
    } 
    questionData = await request("https://leetcode.com/graphql", query, { categorySlug, skip, limit, filters });
    questionData = questionData.problemsetQuestionList;

    randQnNo = Math.floor(Math.random() * (49)); 

    randQnData = questionData.questions[randQnNo];
    randQnLink = randQnData.title;
    randQnLink = randQnLink.replace("'", "");   //Removes all ' and replaces all special characters with - to fit the url.
    randQnLink = randQnLink.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

    topicTags = randQnData.topicTags.map(tag => tag.name);

    embed = BuildEmbed(
        embed,
        {
            title : `${randQnData.frontendQuestionId}. ${randQnData.title}`,
            description : `Question Id : ${randQnData.frontendQuestionId}`,
            thumbnail: "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png",
            url: `https://leetcode.com/problems/${randQnLink}`,
            fields: [
                { name : "Difficulty", value : `${randQnData.difficulty}` , inline : true },
                { name : "Acceptance Rate", value : `${Math.round(randQnData.acRate)}%`, inline : true },
                {name : "Tags", value : topicTags},
            ]
        }
    )

    await interaction.editReply({content: `:keyboard: Here's a question: **${randQnData.title}**`, embeds : [embed]})
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leetcode")
        .setDescription("Commands to interact with leetcode.")

        .addSubcommand(subcommand => {
            return subcommand.setName("user")
                .setDescription("Get user profile.")
                .addStringOption(options => options.setName("username").setDescription("Leetcode username").setRequired(true))
        })

        .addSubcommand(subcommand => {
            return subcommand.setName("question")
                .setDescription("Get a question.")
                .addStringOption(options => options.setName("difficulty").setDescription("Question Difficulty")
                    .addChoice("Easy", "Easy")
                    .addChoice("Medium", "Medium")
                    .addChoice("Hard", "Hard"))
        })

        .addSubcommand(subcommand => {
            return subcommand.setName("daily")
                .setDescription("Get the daily challenge.")
        }),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "user":
                await GetLeetcodeUser(interaction);
                break;
            case "question":
                await GetLeetcodeQuestion(interaction);
                break;
            case "daily":
                await GetLeetcodeDaily(interaction);
                break;
        }
    }
}