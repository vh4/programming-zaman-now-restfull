//src/helpers/interface/global.interface/d.ts
declare global {
    namespace Express {
        interface Request {
            payload: {
                mid: string;
                ip:string;
            };
            user?: object;
            module?: string;
            requests?:any;
            responses?:any;
        }
    }
}