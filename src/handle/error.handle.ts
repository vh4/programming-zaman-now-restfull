class ErrorHandler extends Error {
    
    public status: number;
    public response_code?: string;

    constructor(status: number, response_code: string, message: string) {
        super(message);
        this.status = status;
        this.response_code = response_code;

        this.name = this.constructor.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ErrorHandler };
