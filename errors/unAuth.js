

import {StatusCodes} from 'http-status-codes'
import CustomAPI from './custom-api'

class Unauthenticated extends CustomAPI {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default Unauthenticated