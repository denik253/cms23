import React, { useState, useRef, useEffect } from "react";



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.addEventListener("keydown", handleInputKeyDown);

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keydown", handleInputKeyDown);
      }
    };
  }, []);


  
  // user requests
const prompts = [
  ["привіт", "добрий день", "доброго часу доби"],

  ["що ти вмієш?", "покажи що вмієш?"],

  ["як по новому називається фіту?"],
 ]
  
 // Possible responses, in corresponding order
  
 const replies = [
  ["Доброго дня, чим можу допомогти?", "Доброго часу доби, я бот-асистент, запитайте мене, що я вмію"],

  ["Я можу спробувати допомогти Вам, з пошуком необхідної інформації"],

  ["Тепер Ваш факультет називається ФІТМ. Посилання на оновлену сторінку Вашого факультету: https://fitm.kubg.edu.ua"],
 ]

 
// Random for any other user input
const alternative = [
  "За запитом нічого не знайдено",
  "Хм... Я нічого не знайшов",
]

  function handleInputKeyDown(e) {
    if (e.code === "Enter") {
      const input = inputRef.current.value;
      inputRef.current.value = "";
      output(input);
    }
  }

  function output(input) {
    let product = [];

    let text = input.toLowerCase().trim();

    if (compare(prompts, replies, text)) {
      // Search for exact match in `prompts`
      product.push(compare(prompts, replies, text));
    }
    
    else {
    let search = Array.from(document.body.getElementsByTagName("p")); //знаходимо всі співпадіння з заданим тегом та створюємо масив
    console.log(search);
    //res1 = [...search].map(({ textContent: txt }) => txt.toLowerCase()); //відображаємо зміст тегів

    let letresnormal = []
    let res1 = [];
    for (let i = 0; i<search.length; i++){
        if (search[i].textContent !== ''){
            res1[i] = search[i].textContent.toLowerCase();
            letresnormal[i] = search[i].textContent;
        }
    }
    console.log(res1);
    console.log(letresnormal);


    let res2;
    res2 = res1.includes(text); // на запит
    console.log(res2);

    console.log(res1.find(el => el.toLowerCase() === text.toLowerCase()));


    let resArray = [];

    for (let i = 0; i < res1.length; i++) {  ///цикл розбиття массиву змісту тегів на масиви де, кожен тег це масив елементів типу string
        resArray.push(res1[i].split(" "))
        

    }
    console.log(resArray);

    let inputArray = text.split(" ");   ///з введенного тексту створюється масив, елементами якого є введений текст типу string  

    for (let i = 0; i < inputArray.length; i++) {            ///цикл за допомогою якого, якщо довжина слова > 4, то видаляє останні 2 символа, якщо довжина слова > 3, то видаляє 1 символ з кінця
        if (inputArray[i].length > 4) {
            inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 2);
        } else if (inputArray[i].length > 3) {
            inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 1);
            if (inputArray[i].length > 2) {
                inputArray[i] = inputArray[i].substring(0, inputArray[i].length - 1);
            }
            
        } else {
            inputArray.splice(i, 1);
        }
    }

    console.log(inputArray);


    let indexArray = new Array(res1.length);

    for (let i = 0; i < indexArray.length; i++) { 
        indexArray[i] = 0;
    }

    for (let k = 0; k < inputArray.length; k++) {
        for (let i = 0; i < res1.length; i++) {
            for (let j = 0; j < resArray[i].length; j++) {

                if (resArray[i][j].includes(inputArray[k])) {
                    indexArray[i]++
                }
            }
        }
    }

    console.log(indexArray);

    let max = 0;
    for (let i = 0; i < indexArray.length; i++) {
        if (indexArray[i] > max) {
            max = indexArray[i];
        }
    }


    let response = true;
    for (let j = 0; j < indexArray.length; j++) {
        for (let i = 0; i < indexArray.length; i++) {
            if (indexArray[i] == max && indexArray[i] > 0) {
                product.push(letresnormal[i]); ///змінна для боту
                response = false;
            }
        }
        max--;
    }
    console.log(response);
    if (response) {
        // якщо фолс, дані беруться з dialog.js
        product.push(alternative[Math.floor(Math.random() * alternative.length)]);
    }
}

    // Update messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: input },
      ...product.map((p) => ({ type: "bot", text: p })),
    ]);
  }

  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input matches promptsArray
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when a reply is found instead of iterating through the whole array
        break;
      }
    }
    return reply;
  }

  return (
    <div className="dialog-window show">
      <div id="messages">
        {messages.map((message, index) => (
          <div key={index} className={`response ${message.type}`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <input id="input" ref={inputRef} type="text" />
    </div>
  );
}

export default Chatbot;