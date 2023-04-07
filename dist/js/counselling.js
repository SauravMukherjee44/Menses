import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAH0cGACFs08M3rrD3_swwDpltG2KzzzCY",
  authDomain: "gsolution-754c5.firebaseapp.com",
  projectId: "gsolution-754c5",
  storageBucket: "gsolution-754c5.appspot.com",
  messagingSenderId: "307270571076",
  appId: "1:307270571076:web:4f1c5083864fab91621811",
  measurementId: "G-PG6XWR2DPQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const docRef = doc(db, "counseller", "A");
const docRef2 = doc(db, "counseller", "B");
function hourfinder(currhr, counsellerhr) {
  if ((counsellerhr + 1 >= 10 && counsellerhr <= 18) || currhr >= 6) {
    return false;
  } else {
    return true;
  }
}

// get data from firestore collection
function getCounsellorData1() {
  var a = prompt("Enter your Email");
  const link1 = "https://meet.google.com/nkq-bjdn-nkv";
  var tm, date;



  getDoc(docRef)
    .then((doci) => {
      const curr = new Date();
      var tommorow = new Date();
      const counseller = doci.data();
      tommorow.setFullYear(counseller.year);
      tommorow.setDate(counseller.date);
      tommorow.setHours(counseller.hour);
      tommorow.setMinutes(counseller.minute);
      tommorow.setMonth(counseller.month);
      tommorow.setSeconds(counseller.seconds);
      tommorow.setDate(tommorow.getDate() + 1);
      var changedate = hourfinder(curr.getHours, counseller.hour);
      // check if counseller is free on prev dates
      // then set meet instantly if current hr is less than 5
      // else set meet for next day 10
      console.log(curr.getDate());
      console.log("hello" + counseller.date);

      if (curr.getMonth() > counseller.month || curr.getDate() > counseller.date || curr.getFullYear() > counseller.year) {

        if (curr.getHours() <= 17 && curr.getHours() >= 10) {
          alert("meeting is schedule at your current time");
          const cityRef = doc(db, "counseller", "A");

          setDoc(
            cityRef,
            {
              year: curr.getFullYear(),
              month: curr.getMonth(),
              date: curr.getDate(),
              hour: curr.getHours() + 1,
              minute: curr.getMinutes(),
              seconds: curr.getSeconds(),
            },
            { merge: true }
          );
          tm = curr.getHours();
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = curr.getDate()+":"+curr.getMonth()+":"+curr.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        } else {
          alert("meeting is schedule at tommorow  10");
          const cityRef = doc(db, "counseller", "A");
curr.setDate(curr.getDate()+1)
          setDoc(
            cityRef,
            {
              year: tommorow.getFullYear(),
              month: tommorow.getMonth(),
              date: curr.getDate(),
              hour: 11,
              minute: tommorow.getMinutes(),
              seconds: tommorow.getSeconds(),
            },
            { merge: true }
          );

          tm = 10
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = curr.getDate()+":"+curr.getMonth()+":"+curr.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        }
      }
      //  set meet time to coune.hour+1 and meet is at coun.hour if curr.hour+1 is less than 6 else set date+=1 and time=8
      else  {
    
        // if change of date is required then set meet for tommorow and set meet time to 10
        if (changedate) {
          alert("meeting is schedule at 10");
          const cityRef = doc(db, "counseller", "A");

          setDoc(
            cityRef,
            {
              year: tommorow.getFullYear(),
              month: tommorow.getMonth(),
              date: tommorow.getDate(),
              hour: 11,
              minute: tommorow.getMinutes(),
              seconds: tommorow.getSeconds(),
            },
            { merge: true }
          );
          tm = 10
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = tommorow.getDate()+":"+tommorow.getMonth()+":"+tommorow.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        }
        // if today meet is possible then set meet time to counseller time
        else {
          const cityRef = doc(db, "counseller", "A");
          if (counseller.hour + 1 >= 18) {
            const cityRef = doc(db, "counseller", "A");

            setDoc(
              cityRef,
              {
                year: tommorow.getFullYear(),
                month: tommorow.getMonth(),
                date: tommorow.getDate(),
                hour: 11,
                minute: tommorow.getMinutes(),
                seconds: tommorow.getSeconds(),
              },
              { merge: true }
            );
            tm = 10
            if (tm>=12) {
              tm=tm+"PM"
              
            }
            else{
              tm+="AM"
            }
            date = tommorow.getDate()+":"+tommorow.getMonth()+":"+tommorow.getFullYear();
            Email.send({
              Host: "smtp.google.com",
              Username: "mensesperiodpovertytracker@gmail.com",
              Password: "@12345abcde",
              To: a,
              From: "mensesperiodpovertytracker@gmail.com",
              Subject: "Meeting link of Counselling Menses",
              Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1+link1,
            }).then((message) => alert("Check Your email for meeting link"));
            alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
          } else {
            setDoc(
              cityRef,
              {
                year: counseller.year,
                month: counseller.month,
                date: counseller.date,
                hour: counseller.hour + 1,
                minute: counseller.minute,
                seconds: counseller.hour,
              },
              { merge: true }
            );
            tm = counseller.hour;
            if (tm>=12) {
              tm=tm+"PM"
              
            }
            else{
              tm+="AM"
            }
            date =  counseller.date+":"+counseller.month+":"+counseller.year;
            Email.send({
              Host: "smtp.google.com",
              Username: "mensesperiodpovertytracker@gmail.com",
              Password: "@12345abcde",
              To: a,
              From: "mensesperiodpovertytracker@gmail.com",
              Subject: "Meeting link of Counselling Menses",
              Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
            }).then((message) => alert("Check Your email for meeting link"));
            alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
          }
        }
      }
      //  else {
      //   //  case when counseller is busy and cant take meet on same date then set meet time to date

      //   if (changedate) {
      //     alert("meeting is schedule at 10");
      //     const cityRef = doc(db, "counseller", "A");

      //     setDoc(
      //       cityRef,
      //       {
      //         year: tommorow.getFullYear(),
      //         month: tommorow.getMonth(),
      //         date: tommorow.getDate(),
      //         hour: 11,
      //         minute: tommorow.getMinutes(),
      //         seconds: tommorow.getSeconds(),
      //       },
      //       { merge: true }
      //     );
      //     tm = 10
      //     date = tommorow.getDate();
      //     Email.send({
      //       Host: "smtp.google.com",
      //       Username: "mensesperiodpovertytracker@gmail.com",
      //       Password: "@12345abcde",
      //       To: a,
      //       From: "mensesperiodpovertytracker@gmail.com",
      //       Subject: "Meeting link of Counselling Menses",
      //       Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //     }).then((message) => alert("Check Your email for meeting link"));
      //     alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //   }
      //   // if today meet is possible then set meet time to counseller time
      //   else {
      //     const cityRef = doc(db, "counseller", "A");
      //     if (counseller.hour + 1 >= 18) {
      //       const cityRef = doc(db, "counseller", "A");

      //       setDoc(
      //         cityRef,
      //         {
      //           year: tommorow.getFullYear(),
      //           month: tommorow.getMonth(),
      //           date: tommorow.getDate(),
      //           hour: 11,
      //           minute: tommorow.getMinutes(),
      //           seconds: tommorow.getSeconds(),
      //         },
      //         { merge: true }
      //       );
      //       tm = 10
      //       date = tommorow.getDate();
      //       Email.send({
      //         Host: "smtp.google.com",
      //         Username: "mensesperiodpovertytracker@gmail.com",
      //         Password: "@12345abcde",
      //         To: a,
      //         From: "mensesperiodpovertytracker@gmail.com",
      //         Subject: "Meeting link of Counselling Menses",
      //         Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1+link1,
      //       }).then((message) => alert("Check Your email for meeting link"));
      //       alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //     } else {
      //       setDoc(
      //         cityRef,
      //         {
      //           year: counseller.year,
      //           month: counseller.month,
      //           date: counseller.date,
      //           hour: counseller.hour + 1,
      //           minute: counseller.minute,
      //           seconds: counseller.hour,
      //         },
      //         { merge: true }
      //       );
      //       tm = counseller.hour;
      //       date =  counseller.date;
      //       Email.send({
      //         Host: "smtp.google.com",
      //         Username: "mensesperiodpovertytracker@gmail.com",
      //         Password: "@12345abcde",
      //         To: a,
      //         From: "mensesperiodpovertytracker@gmail.com",
      //         Subject: "Meeting link of Counselling Menses",
      //         Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //       }).then((message) => alert("Check Your email for meeting link"));
      //       alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //     }
      //   }




      //   alert("i am in last")
      //   const cityRef = doc(db, "counseller", "A");

      //   setDoc(
      //     cityRef,
      //     {
      //       // year:2021
      //       year: tommorow.getFullYear(),
      //       month: tommorow.getMonth(),
      //       date: tommorow.getDate(),
      //       hour: 11,
      //       minute: tommorow.getMinutes(),
      //       seconds: tommorow.getSeconds(),
      //     },
      //     { merge: true }
      //   );

      //   tm = 10;
      //   date =  tommorow.getDate();
      //   Email.send({
      //     Host: "smtp.google.com",
      //     Username: "mensesperiodpovertytracker@gmail.com",
      //     Password: "@12345abcde",
      //     To: a,
      //     From: "mensesperiodpovertytracker@gmail.com",
      //     Subject: "Meeting link of Counselling Menses",
      //     Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //   }).then((message) => alert("Check Your email for meeting link"));
      //   alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        
      // }
    })
    .catch((error) => {
      alert(error);
    });
}

// const cityRef = doc(db, 'counseller', "A");
// function getCounsellorData2() {
//     getDoc(docRef)
//         .then((doc) => {
//             const lastdate = doc.data()
//             var today = new Date();
//             alert(lastdate)
//             alert(lastdate.getDate())
//             // console.log(lastdate)
//             if (lastdate.getDate() < today.getDate()) {
//                 {
//                     console.log("yes")
//                     // update document in firestore with last date is today
//                 }
//             }
//             if (lastdate.getDate() == today.getDate()) {
//                 {
//                     console.log("hello")
//                     // update document in firestore with last date is today
//                 }

//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// add data to firestore collection firebase
// function addCounsellorData() {

//     const l = new Date();
//     const cityRef = doc(db, 'counseller', 'A');
//     setDoc(cityRef, {
//         year: l.getFullYear(),
//         month: l.getMonth(),
//         date: l.getDate(),
//         hour:l.getHours(),
//         minute:l.getMinutes(),
//         seconds:l.getSeconds()
//     }, { merge: true });
//     const cityRef2 = doc(db, 'counseller', 'B');
//     setDoc(cityRef2, {
//        year: l.getFullYear(),
//         month: l.getMonth(),
//         date: l.getDate(),
//         hour:l.getHours(),
//         minute:l.getMinutes(),
//         seconds:l.getSeconds()
//     }, { merge: true });
// }
// addCounsellorData();


function getCounsellorData2() {
  var a = prompt("Enter your Email");
  const link1 = "https://meet.google.com/gor-kxkm-fwyv";
  var tm, date;



  getDoc(docRef)
    .then((doci) => {
      const curr = new Date();
      var tommorow = new Date();
      const counseller = doci.data();
      tommorow.setFullYear(counseller.year);
      tommorow.setDate(counseller.date);
      tommorow.setHours(counseller.hour);
      tommorow.setMinutes(counseller.minute);
      tommorow.setMonth(counseller.month);
      tommorow.setSeconds(counseller.seconds);
      tommorow.setDate(tommorow.getDate() + 1);
      var changedate = hourfinder(curr.getHours, counseller.hour);
      // check if counseller is free on prev dates
      // then set meet instantly if current hr is less than 5
      // else set meet for next day 10
      console.log(curr.getDate());
      console.log("hello" + counseller.date);

      if (curr.getMonth() > counseller.month || curr.getDate() > counseller.date || curr.getFullYear() > counseller.year) {

        if (curr.getHours() <= 17 && curr.getHours() >= 10) {
          alert("meeting is schedule at your current time");
          const cityRef = doc(db, "counseller", "B");

          setDoc(
            cityRef,
            {
              year: curr.getFullYear(),
              month: curr.getMonth(),
              date: curr.getDate(),
              hour: curr.getHours() + 1,
              minute: curr.getMinutes(),
              seconds: curr.getSeconds(),
            },
            { merge: true }
          );
          tm = curr.getHours();
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = curr.getDate()+":"+curr.getMonth()+":"+curr.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        } else {
          alert("meeting is schedule at tommorow  10");
          const cityRef = doc(db, "counseller", "B");
curr.setDate(curr.getDate()+1)
          setDoc(
            cityRef,
            {
              year: tommorow.getFullYear(),
              month: tommorow.getMonth(),
              date: curr.getDate(),
              hour: 11,
              minute: tommorow.getMinutes(),
              seconds: tommorow.getSeconds(),
            },
            { merge: true }
          );

          tm = 10
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = curr.getDate()+":"+curr.getMonth()+":"+curr.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        }
      }
      //  set meet time to coune.hour+1 and meet is at coun.hour if curr.hour+1 is less than 6 else set date+=1 and time=8
      else  {
    
        // if change of date is required then set meet for tommorow and set meet time to 10
        if (changedate) {
          alert("meeting is schedule at 10");
          const cityRef = doc(db, "counseller", "B");

          setDoc(
            cityRef,
            {
              year: tommorow.getFullYear(),
              month: tommorow.getMonth(),
              date: tommorow.getDate(),
              hour: 11,
              minute: tommorow.getMinutes(),
              seconds: tommorow.getSeconds(),
            },
            { merge: true }
          );
          tm = 10
          if (tm>=12) {
            tm=tm+"PM"
            
          }
          else{
            tm+="AM"
          }
          date = tommorow.getDate()+":"+tommorow.getMonth()+":"+tommorow.getFullYear();
          Email.send({
            Host: "smtp.google.com",
            Username: "mensesperiodpovertytracker@gmail.com",
            Password: "@12345abcde",
            To: a,
            From: "mensesperiodpovertytracker@gmail.com",
            Subject: "Meeting link of Counselling Menses",
            Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
          }).then((message) => alert("Check Your email for meeting link"));
          alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        }
        // if today meet is possible then set meet time to counseller time
        else {
          const cityRef = doc(db, "counseller", "B");
          if (counseller.hour + 1 >= 18) {
            const cityRef = doc(db, "counseller", "B");

            setDoc(
              cityRef,
              {
                year: tommorow.getFullYear(),
                month: tommorow.getMonth(),
                date: tommorow.getDate(),
                hour: 11,
                minute: tommorow.getMinutes(),
                seconds: tommorow.getSeconds(),
              },
              { merge: true }
            );
            tm = 10
            if (tm>=12) {
              tm=tm+"PM"
              
            }
            else{
              tm+="AM"
            }
            date = tommorow.getDate()+":"+tommorow.getMonth()+":"+tommorow.getFullYear();
            Email.send({
              Host: "smtp.google.com",
              Username: "mensesperiodpovertytracker@gmail.com",
              Password: "@12345abcde",
              To: a,
              From: "mensesperiodpovertytracker@gmail.com",
              Subject: "Meeting link of Counselling Menses",
              Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1+link1,
            }).then((message) => alert("Check Your email for meeting link"));
            alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
          } else {
            setDoc(
              cityRef,
              {
                year: counseller.year,
                month: counseller.month,
                date: counseller.date,
                hour: counseller.hour + 1,
                minute: counseller.minute,
                seconds: counseller.hour,
              },
              { merge: true }
            );
            tm = counseller.hour;
            if (tm>=12) {
              tm=tm+"PM"
              
            }
            else{
              tm+="AM"
            }
            date =  counseller.date+":"+counseller.month+":"+counseller.year;
            Email.send({
              Host: "smtp.google.com",
              Username: "mensesperiodpovertytracker@gmail.com",
              Password: "@12345abcde",
              To: a,
              From: "mensesperiodpovertytracker@gmail.com",
              Subject: "Meeting link of Counselling Menses",
              Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
            }).then((message) => alert("Check Your email for meeting link"));
            alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
          }
        }
      }
      //  else {
      //   //  case when counseller is busy and cant take meet on same date then set meet time to date

      //   if (changedate) {
      //     alert("meeting is schedule at 10");
      //     const cityRef = doc(db, "counseller", "B");

      //     setDoc(
      //       cityRef,
      //       {
      //         year: tommorow.getFullYear(),
      //         month: tommorow.getMonth(),
      //         date: tommorow.getDate(),
      //         hour: 11,
      //         minute: tommorow.getMinutes(),
      //         seconds: tommorow.getSeconds(),
      //       },
      //       { merge: true }
      //     );
      //     tm = 10
      //     date = tommorow.getDate();
      //     Email.send({
      //       Host: "smtp.google.com",
      //       Username: "mensesperiodpovertytracker@gmail.com",
      //       Password: "@12345abcde",
      //       To: a,
      //       From: "mensesperiodpovertytracker@gmail.com",
      //       Subject: "Meeting link of Counselling Menses",
      //       Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //     }).then((message) => alert("Check Your email for meeting link"));
      //     alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //   }
      //   // if today meet is possible then set meet time to counseller time
      //   else {
      //     const cityRef = doc(db, "counseller", "B");
      //     if (counseller.hour + 1 >= 18) {
      //       const cityRef = doc(db, "counseller", "B");

      //       setDoc(
      //         cityRef,
      //         {
      //           year: tommorow.getFullYear(),
      //           month: tommorow.getMonth(),
      //           date: tommorow.getDate(),
      //           hour: 11,
      //           minute: tommorow.getMinutes(),
      //           seconds: tommorow.getSeconds(),
      //         },
      //         { merge: true }
      //       );
      //       tm = 10
      //       date = tommorow.getDate();
      //       Email.send({
      //         Host: "smtp.google.com",
      //         Username: "mensesperiodpovertytracker@gmail.com",
      //         Password: "@12345abcde",
      //         To: a,
      //         From: "mensesperiodpovertytracker@gmail.com",
      //         Subject: "Meeting link of Counselling Menses",
      //         Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1+link1,
      //       }).then((message) => alert("Check Your email for meeting link"));
      //       alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //     } else {
      //       setDoc(
      //         cityRef,
      //         {
      //           year: counseller.year,
      //           month: counseller.month,
      //           date: counseller.date,
      //           hour: counseller.hour + 1,
      //           minute: counseller.minute,
      //           seconds: counseller.hour,
      //         },
      //         { merge: true }
      //       );
      //       tm = counseller.hour;
      //       date =  counseller.date;
      //       Email.send({
      //         Host: "smtp.google.com",
      //         Username: "mensesperiodpovertytracker@gmail.com",
      //         Password: "@12345abcde",
      //         To: a,
      //         From: "mensesperiodpovertytracker@gmail.com",
      //         Subject: "Meeting link of Counselling Menses",
      //         Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //       }).then((message) => alert("Check Your email for meeting link"));
      //       alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
      //     }
      //   }




      //   alert("i am in last")
      //   const cityRef = doc(db, "counseller", "B");

      //   setDoc(
      //     cityRef,
      //     {
      //       // year:2021
      //       year: tommorow.getFullYear(),
      //       month: tommorow.getMonth(),
      //       date: tommorow.getDate(),
      //       hour: 11,
      //       minute: tommorow.getMinutes(),
      //       seconds: tommorow.getSeconds(),
      //     },
      //     { merge: true }
      //   );

      //   tm = 10;
      //   date =  tommorow.getDate();
      //   Email.send({
      //     Host: "smtp.google.com",
      //     Username: "mensesperiodpovertytracker@gmail.com",
      //     Password: "@12345abcde",
      //     To: a,
      //     From: "mensesperiodpovertytracker@gmail.com",
      //     Subject: "Meeting link of Counselling Menses",
      //     Body: " Hello User Your Meeting with Our Counsellor has been confirmed Come to the meeting at" + tm + " " + date + "You can join Your meeting by clicking this link"+link1,
      //   }).then((message) => alert("Check Your email for meeting link"));
      //   alert("Your Meeting has been Scheduled on" + tm +"  "+ date);
        
      // }
    })
    .catch((error) => {
      alert(error);
    });
}





























document
  .getElementsByClassName("button1")[0]
  .addEventListener("click", getCounsellorData1);

document.getElementsByClassName("button2")[0].addEventListener("click", getCounsellorData2);

// https://meet.google.com/nkq-bjdn-nkv for a
// https://meet.google.com/gor-kxkm-fwy for b
// calender id 5q75opg7ujjrnkpdlv3cpuroc8@group.calendar.google.com