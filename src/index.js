import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
let length = 0;
let getAll;
let arr;
setInterval(async ()=>{
  getAll = await API.graphql(
    graphqlOperation(queries.listTodos)
  );
  arr = getAll.data.listTodos.items;
  if(length!=arr.length){
    length = arr.length;
    arr = (arr.sort(function( a , b){
      a = parseInt(a.id);
      b = parseInt(b.id);
      if(a > b) return -1;
      if(a < b) return 1;
      return 0;
  }));
  console.log(arr[0].name);
  const response = fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({body:arr[0].name}),
  });
  console.log(response);
}
});


/*
const getAll = API.graphql(
  graphqlOperation(queries.listTodos).next((todoData)=>{
    console.log(todoData);
    getUsers.data.listUsers.items.map(async (it) => {
      const d1 = new Date(it.updatedAt);
      const d2 = Date.now();
      const diff = d2 - d1;
      if (diff > 9000) {
        const oldUser = await API.graphql(
          graphqlOperation(mutations.deleteUser, {
            input: {
              id: it.id,
            },
          })
        );
        userLength--;
      }
    });
  })
);*/



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
