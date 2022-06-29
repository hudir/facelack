let init = {
    appName: 'facelack',
    users:[{userName:'admin',password:'admin',online:false, userID:'00admin'}],
    currentUser:null,
    currentUserChannels:null,
    channels:[{
        channelName: "general",

        private: false,
        description: "This is general channel",
        createBy : {user: 'admin', time: 'June 29, 09:50'},

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