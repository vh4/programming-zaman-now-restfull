import { Request, Response, NextFunction } from "express";
import useragent from "express-useragent";
import '../intefaces/express.global'

interface CustomRequest extends Request {
	clientIp?: string;
	useragent?: useragent.Details;
}


function checkIP(req: Request, res: Response) {
    let clientIP = '';

    if (req.headers['x-otx-ip']) {
        clientIP = req.headers['x-otx-ip'] as string;
    } else if (req.headers['cf-connecting-ip']) {
        clientIP = req.headers['cf-connecting-ip'] as string;
    } else if (req.headers['x-forwarded-for']) {
        clientIP = req.headers['x-forwarded-for'] as string;
    } else if (req.connection && req.connection.remoteAddress) {
        clientIP = req.connection.remoteAddress;
    } else if (req.socket && req.socket.remoteAddress) {
        clientIP = req.socket.remoteAddress;
    }

    clientIP = clientIP.replace('::ffff:', '');

    return clientIP;
}


function UserAgents(req: CustomRequest, res: Response) {
	const userAgent = req.useragent;
	const ip = req.clientIp || checkIP(req, res);
  
	if (!userAgent) {
	  return null;
	}
  
	const response = {
	  ip: ip || '',
	  browser: {
		name: userAgent.browser,
		version: userAgent.version,
		platform: userAgent.platform,
		os: userAgent.os,
		source: userAgent.source,
		isMobile: userAgent.isMobile,
		isDesktop: userAgent.isDesktop,
		isBot: userAgent.isBot
	  }
	};
  
	return response;
}

export { checkIP, UserAgents };