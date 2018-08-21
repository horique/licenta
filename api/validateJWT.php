<?php
use \Firebase\JWT\JWT;
/*
 * Get all headers from the HTTP request
 */
if ($request[0]) {
  $authHeader = getallheaders()['Authorization'];
  /*
   * Look for the 'authorization' header
   */
  if ($authHeader) {
    /*
     * Extract the jwt from the Bearer
     */
    list($jwt) = sscanf($authHeader, 'Bearer %s');
    if ($jwt) {
      try {
        $secretKey = "2D9B99AE97CD37997EE881C54B6C738C9D18C40CC04B9179D6A86211F20E8DFFE389FFF2AE844E963BCFB67EFFAC854F05190F38FA41B9D3DC2C96CB8A86C95D";
        $token = JWT::decode($jwt, $secretKey, array('HS512'));
      } catch (Exception $e) {
        /*
         * the token was not able to be decoded.
         * this is likely because the signature was not able to be verified (tampered token)
         */
       header('HTTP/1.0 401 Unauthorized');
      }
    } else {
      /*
       * No token was able to be extracted from the authorization header
       */
      header('HTTP/1.0 400 Bad Request');
    }
  } else {
    /*
     * The request lacks the authorization token
     */
    header('HTTP/1.0 400 Bad Request');
    echo 'Token not found in request';
  }
} else {
  header('HTTP/1.0 405 Method Not Allowed');
}
?>
