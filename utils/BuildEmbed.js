const config = require("../config.json");

module.exports.BuildEmbed = function BuildEmbed(embed, { title, url, author, description, image, thumbnail, fields }) {
    embed.setColor(config.Theme);
    if(title) embed.setTitle(title.toString());
    if(url) embed.setURL(url.toString());
    if(author) embed.setAuthor(author.toString());
    if(description) embed.setDescription(description.toString());
    if(image) embed.setImage(image);
    if(thumbnail) embed.setThumbnail(thumbnail);
    if(fields) {
        //Iterate through the fields and for each field, attach the fields accordingly.
        for(const field of fields) {
            if(field.inline) {
                embed.addField(`${field.name}`, `${field.value}`, true);
            } else {
                embed.addField(`${field.name}`, `${field.value}`);
            }
        }
    }
    embed.setFooter("Bot by Ruin9999#9181").setTimestamp();
    
    return embed;
}