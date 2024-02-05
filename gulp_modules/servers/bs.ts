/**
 * 서버설정
 * 
 * @Modification Information
 * 수정일 : 수정자 : 수정내용
 * --------------------------
 * 2023.12.14 : Mabongpapa : 최초생성
 */
import express from "express";
const bsServer = ():Promise<void> => {
    return new Promise((resolve,reject)=>{
        const app = express();
        app.use("/",express.static("./_bs"));
        app.listen("3500",()=>{
            console.log(`port 3500`);
            resolve();
        });
    });
}

export {bsServer};