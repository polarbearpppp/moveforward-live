import React, {useState} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export const VoteService = {
    async GetVoteData() {
      const voteCollectionRef = collection(db, "เขตจตุจักร");
      const response = await getDocs(voteCollectionRef);
      return response;
    },
  
    async getVotePoint() {
      const data = await this.GetVoteData();
      return Promise.resolve(data);
    },
  };
  