const mainPage = new MainPage()

function hide_and_show(name){
      
            const div1 = document.getElementById(name);
            if(div1.style.display === "block"){
                div1.style.display ="none"
            }
            else{
                div1.style.display ="block"
            }

       


}

function connect() {
    hide_and_show("from")
    hide_and_show("chats_rooms")

    intervalId = setInterval(last_message, 1500)

    if (mainPage.One_time !== 0) { //A one-time operation
        check_online()
        setInterval(check_online, 5000)
        emoji_keyboard()
        mainPage.One_time = 0
    }
}

function Show_connected_rooms() {
    hide_and_show("onlines")
    hide_and_show("room")

}

function Hide_chats_rooms_and_room_cleaner() {
    mainPage.size_array = []
    mainPage.message_list = document.getElementById('box-body')
    mainPage.message_list.innerHTML = " "
    hide_and_show("chats_rooms")
    hide_and_show("room")
   
}

function exit_to_login_screen(){
    hide_and_show("from")
    hide_and_show("chats_rooms")
    hide_and_show("onlines")


}

function edit_or_delete_message(id) { //Edit or delete a message
    const message = document.getElementById(`message-${id}`);

    if (message.className === "user") {//Only the owner of the message can delete or edit
        Swal.fire({
            title: 'Edit or delete the message?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'edit',
            denyButtonText: `delete`,
        }).then((result) => {
            !result.isDismissed && (result.isConfirmed ? editing_message(id) : Swal.fire('The message has been deleted', '', 'info') && delete_(id));

                      })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are trying to edit a message that is not yours!',
        })
    }
}

//  async function dal 75
  function editing_message(number) {
    (async () => {
        const { value: text } = await Swal.fire({
            input: 'text',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            }, showCancelButton: true
        })
        if (text) {
            [Swal.fire(text)]
            put(number, text)
        }
    })()
}

function activation(n) { //The function is responsible for displaying storage of the selected chat
    if (mainPage.name !== '') {
        mainPage.chat_n = n // Used by fetch functions
        mainPage.json_id = id_message(n) //Used by the post_data function
        mainPage.size_array = []
        document.querySelector("#text").addEventListener("keydown", handleEnter);
        hide_and_show("chats_rooms")
        Show_connected_rooms()
        post_data() // test
        //Defining components for future use
       
    }
    else {
        Swal.fire('You must enter a name!! Without a name you cannot enter the room', '', 'success')
    }
}


function add_img() {  //A function saves the user's image
    frame.src = URL.createObjectURL(event.target.files[0]);
    mainPage.img_user = frame.src
}

function handleEnter(enter) { //Makes the enter button work like a send button
    const text = document.getElementById("text").value;
    if (enter.keyCode === 13 && text !== "") {
        enter.preventDefault();
        post_data(text);
    }
}