// import functions and grab DOM elements
import { renderMushroom, renderFriend, renderMagicMushroom } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
const main = document.getElementById('main');
const soberBtn = document.getElementById('sober');


// initialize state

let mushroomCount = 1;
let magicMushroomCount = 1;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Austin',
        satisfaction: 1,
    },
    {
        name: 'Aaron',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else if (Math.random() > 0.6) {
        alert('found a magic mushroom!');

        magicMushroomCount++;
        displayMushrooms();
    }
    else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    const friendName = friendInputEl.value;
    // create a new friend object
    const newFriend = {
        name: `${friendName}`,
        satisfaction: 1,
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

// sober up button
soberBtn.addEventListener('click', () => {
    main.classList.remove('main-two');
    main.classList.add('main');
    
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    // use renderFriend to make a friendEl
    // this is a clickable list, so . . .
    //     add an event listener to each friend
    //         and if the friend's satisfaction level is below 3 and you have mushrooms left
    //             increment the friends satisfaction and decrement your mushrooms
    //             then display your friends and mushrooms with the updated state
    for (let friend of friendData) {
        const friendEl = renderFriend(friend);
        friendEl.addEventListener('click', () => {
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomCount--;
                displayMushrooms();
                displayFriends();
            }
        });
        friendEl.addEventListener('dblclick', () => {
            if (magicMushroomCount > 0) {
                magicMushroomCount--;
                friend.satisfaction = 3;
                main.classList.remove('main');
                main.classList.add('main-two');
                displayMushrooms();
                displayFriends();
            }
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroom = renderMushroom(i);
        mushroomsEl.append(mushroom);

    }
    for (let e = 0; e < magicMushroomCount; e++) {
        const magicMushroom = renderMagicMushroom(e);
        mushroomsEl.append(magicMushroom);
    }
}


displayFriends();
displayMushrooms();