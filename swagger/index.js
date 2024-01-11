/**
 * @openapi
 * components:
 *  securitySchemes:
 *    bearerAuth:            # arbitrary name for the security scheme
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 */

/**
 * @openapi
 * '/signin':
 *  post:
 *     tags:
 *     - User Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: devdutt@mail.com
 *              password:
 *                type: string
 *                default: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid body
 *      401:
 *        description: Not Authorised
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/movies':
 *  get:
 *     tags:
 *     - Movies
 *     security:
 *     - bearerAuth: []
 *     summary: List Movies
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Movies Not Found
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/movies/{movieId}':
 *  get:
 *     tags:
 *     - Movies
 *     security:
 *     - bearerAuth: []
 *     summary: List Movie Details
 *     parameters:
 *      - name: movieId
 *        in: path
 *        description: Unique Id of the movie
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Movie Not Found
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/movies':
 *  post:
 *     tags:
 *     - Movies
 *     security:
 *     - bearerAuth: []
 *     summary: Create Movie
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - year
 *              - path
 *            properties:
 *              title:
 *                type: string
 *                default: G.I. Joe
 *              year:
 *                type: number
 *                default: 2009
 *              path:
 *                type: string
 *                default: "1736242348284.png"
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Invalid body
 *      401:
 *        description: Not Authorised
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/movies/{movieId}':
 *  put:
 *     tags:
 *     - Movies
 *     security:
 *     - bearerAuth: []
 *     summary: Update Movie
 *     parameters:
 *      - name: movieId
 *        in: path
 *        description: Unique Id of the movie
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - year
 *              - path
 *            properties:
 *              title:
 *                type: string
 *                default: G.I. Joe
 *              year:
 *                type: number
 *                default: 2009
 *              path:
 *                type: string
 *                default: "1736242348284.png"
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid body
 *      401:
 *        description: Not Authorised
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/fileupload':
 *  post:
 *     tags:
 *     - Util
 *     security:
 *     - bearerAuth: []
 *     summary: Upload file
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - poster
 *            properties:
 *              poster:
 *                type: string
 *                format: binary
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid body
 *      401:
 *        description: Not Authorised
 *      500:
 *        description: Server Error
 */
