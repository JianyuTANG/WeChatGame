const express = require('express')
let app = express()
const server = require('http').server(app)
const io = require('socket.io')(server)



const MAX = 30;

class Queue {
    constructor() {
        this.people = 0;
        this.socket = null;
    }
}

class Room {
    constructor() {
        this.people = 0;
        this.socket = null;
        this.aPoint = 0;
        this.bPoint = 0;
        this.aStatus = -1; //状态信息，-1表示游戏未开始；0表示游戏中；1表示游戏结束；2表示中断链接
        this.bStatus = -1;
        this.firstUserId = '';
    }
}

let rooms = [];
let queue = new Queue();

io.on('connection', function (socket) {
    io.people++;
    console.log('connected');
    socket.on('disconnect', function () {
        io.people--;
        console.log('diconnected');
    })
})

function getFreeRoom() {
    let freeRoomId = -1;
    for (let i = 0; i < MAX; i++) {
        if (rooms[i].people === 0) {
            freeRoomId = i;
        }
        else if (rooms[i].people === 1) {
            return i;
        }
    }
    return freeRoomId;
}


queue.socket = io.of('/queue');
queue.socket.on('connection', function (socket) {
    let roomId = getFreeRoom();
    if (roomId != -1) {
        queue.socket.to(socket.id).emit('findroom', roomId);
    }
    else {
        queue.socket.emit('reject', -1);
    }
})

for (let i = 0; i < MAX; i++) {
    rooms[i] = new Room();
    rooms[i].socket = io.of(`/room${i}`);
    rooms[i].socket.on('connection', function (socket) {
        rooms[i].people++;
        if (rooms[i].people === 2) {
            rooms[i].socket.emit('start', 1);
            rooms[i].aStatus = 0;
            rooms[i].bStatus = 0;
            rooms[i].aPoint = 0;
            rooms[i].bPoint = 0;
        }
        else if (rooms[i].people === 1) {
            rooms[i].socket.to(socket.id).emit('start', 0);
            rooms[i].firstUserId = socket.id;
        }
        //对得分的响应（记录）
        socket.on('gainpoint1', function () {
            rooms[i].bPoint++;
        })
        socket.on('gainpoint0', function () {
            rooms[i].aPoint++;
        })
        //对游戏结束的响应
        socket.on('gameEnd', function (data) {
            if (socket.id === rooms[i].firstUserId) {
                rooms[i].aPoint = data.point;
                rooms[i].aStatus = 1;
            }
            else {
                rooms[i].bPoint = data.point;
                rooms[i].bStatus = 1;
            }
            if (rooms[i].aStatus === 1 && rooms[i].aStatus === 1) {
                rooms[i].socket.emit({ "playerA": rooms[i].aPoint, "playerB": rooms[i].bPoint });
            }
        })

        socket.on('disconnect', function () {
            rooms[i].aStatus = 0;
            rooms[i].bStatus = 0;
            rooms[i].aPoint = 0;
            rooms[i].bPoint = 0;
            rooms[i].people = 0;
        })
    })
}


server.listening(8500, function () {
    console.log('listening 8500!')
})