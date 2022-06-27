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
            replay:[]
        }]
    }]

}

export default init