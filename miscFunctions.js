
module.exports = {
    channelIDExtractor(channelHash) {
        if (channelHash == 'current') {
            return channelHash
        }
        let channelID = channelHash.slice(2, channelHash.length - 1)
        return channelID
    }
}