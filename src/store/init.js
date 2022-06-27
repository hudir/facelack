const init = {
    appName: 'facelack',
    users:[{userName:'admin',password:'admin',online:false, userID:'00admin'}],
    currentUser:null,
    currentUserChannels:null,
    channels:[{
        channelName: "general",
        members:['00admin'],
        messages:[{
            user:'00admin',
            time: '27.06 13:54',
            body: "Welcome to join facelack! Start your chat now",
            reply:[]
        }, {
            user:'00admin',
            time: '27.06 15:36',
            body: "find a channel or create one",
            reply:[]
        }]
    }]

}

export default init