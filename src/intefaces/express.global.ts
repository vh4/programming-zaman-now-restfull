//src/helpers/interface/global.interface/d.ts
declare global {
    namespace Express {
        interface Request {
            payload: {
                mid: string;
                ip:string;
            };
            module?: string;
            requests?:any;
            responses?:any;
        }
    }
}