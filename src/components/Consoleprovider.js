import React from 'react';
class Consoleprovider {
	//----------------- message buttons
      consolelog(key,message)
         {
           //return false
           return console.log(key,message)
          
         }
	
}

export const consolepro = new Consoleprovider();