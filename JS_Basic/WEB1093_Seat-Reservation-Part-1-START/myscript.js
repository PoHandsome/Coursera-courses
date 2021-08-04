var reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	}
};



function makeRowSeats (rowLength, leftLength, rightLength) {
    const lines = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u"];
    let counter = 1;
    const secLeft = document.getElementById("left");
    const secRight = document.getElementById("right");
    const secMiddle = document.getElementById("middle");

    for (counter ; counter < 301; counter++ ) {         
        let index = Math.floor((counter-1) / 15);
        if (counter % rowLength == 1) {
            let label = createLabel(lines[index]);
            secLeft.appendChild(label);
            let seat = createSeats(lines[index], counter);
            secLeft.appendChild(seat);
        }
        else if (counter % rowLength == 0) {
            let label = createLabel(lines[index]);
            let seat = createSeats(lines[index], counter);
            secRight.appendChild(seat);
            secRight.appendChild(label);
        }
        else if (counter % rowLength < (leftLength + 1) ) {
            let seat = createSeats(lines[index], counter);
            secLeft.appendChild(seat);
        }
        else if (counter % rowLength < (rowLength - rightLength + 1)) {
            let seat = createSeats(lines[index], counter);
            secMiddle.appendChild(seat);
        }
        else if (counter % rowLength < rowLength) {
            let seat = createSeats(lines[index], counter);
            secRight.appendChild(seat);
        }
    }
}

function createSeats (alpha, number) {
    let seat = document.createElement("div");
    seat.setAttribute("id", `${alpha}${number}`);
    seat.setAttribute("class", "a");
    seat.appendChild(document.createTextNode(number));
    return seat
}

function createLabel (alpha) {
    let label = document.createElement("div");
    label.setAttribute("class", "label")
    label.appendChild(document.createTextNode(alpha.toUpperCase()));
    return label
}

makeRowSeats(15, 3, 3);

(function(){
    "use strict"
    
    let selectedSeats = [];
    const availableSeats = document.querySelectorAll(".a");

    for (const record in reservedSeats) {
        if (reservedSeats.hasOwnProperty(record)) {
            document.getElementById(reservedSeats[record].seat).className = "r";
            document.getElementById(reservedSeats[record].seat).innerHTML = "R";
        }
    }

    availableSeats.forEach(seat => {
        seat.addEventListener("click", event => {
            event.preventDefault();
            seatSelectProcess(event.target);
        })
    });

    function seatSelectProcess (seat) {
        if (!document.getElementById(seat.id).classList.contains("r")){
            let index = selectedSeats.indexOf(seat.id) 
            if ( index > -1 ) {
                selectedSeats.splice(index, 1);
                seat.className = "a";
            }
            else {
                selectedSeats.push(seat.id);
                seat.className = "s";
            }
            manageConfirmation();
        }     
    }
    const resForm = document.getElementById("resform");
    document.getElementById("reserve").addEventListener("click", event => {
        event.preventDefault();
        resForm.style.display = "block"
        document.getElementById("cancel").addEventListener("click", event => {
            event.preventDefault();
            resForm.style.display = "none";
        })
    })
    function manageConfirmation () {
        if ( selectedSeats.length > 0) {
            document.getElementById("confirmres").style.display = "block";
            if (selectedSeats.length > 1) {
                let seatsString = selectedSeats.toString();
                seatsString = seatsString.replace(/,/g, ", ");
                seatsString = seatsString.replace(/,(?=[^,]*$)/, " and");
                document.getElementById("selectedseats").innerHTML = `You have selected seats ${seatsString}.`;
            }
            else {
                document.getElementById("selectedseats").innerHTML = `You have selected seat ${selectedSeats}.`;
            }
            
        }
        else {
            document.getElementById("confirmres").style.display = "none";
            document.getElementById("selectedseats").innerHTML = "You need to select some seats to reserve.<br/><a href='#' id='error'>Close</a> this dialog box and pick at least one seat."
            document.getElementById("error").addEventListener("click", evt => {
                evt.preventDefault();
                resForm.style.display = "none";
            })
        }
    }
    manageConfirmation();

    document.getElementById("confirmres").addEventListener("submit", evt => {
        evt.preventDefault();
        processReservation();
    });

    function processReservation () {
        const hardCodeRecords = Object.keys(reservedSeats).length;
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        let counter = 1;
        let nextRecord = '';

        selectedSeats.forEach( seat => {
            document.getElementById(seat).className = "r";
            document.getElementById(seat).innerHTML = "R";
            nextRecord = `record${hardCodeRecords + counter}`;
            reservedSeats[nextRecord] = {
                seat: seat,
                owner: {
                    fname: fname,
                    lname: lname
                }
            }
            counter++;
        });
        document.getElementById("resform").style.display = "none";
        selectedSeats = [];
        manageConfirmation();

        console.log(reservedSeats);
    }
})();

