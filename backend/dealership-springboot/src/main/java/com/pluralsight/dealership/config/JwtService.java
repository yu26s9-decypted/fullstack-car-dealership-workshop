package com.pluralsight.dealership.config;

import com.pluralsight.dealership.User.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service // transform to a managed bean
public class JwtService {
    private static final String SECRET_KEY = "d4ca1a40909e283327a67d97a7b16e791a8dd21362ced13250f03126417c23b8a8176f0ec612ec87bdf04787d55080851a7456062b81a53369443ed73c1ea7431ff136830c74b40fb8f64c422f1ef302879fc2f2320f3bab386b5812e8697fff1b1695ed6285177864751e2a85a8b60287e3aeaee6c14754d8623c9bb5f28a351d4985750f5a3bd615fe838d34b6c96f698a5df9840c4fa6ab9177857224d362770d52fc5d7df6b1dc500c75f0f40e8d291e87787d65ec1871d2b9a3771a00660cadec033dd272930dae95178af0667a605b30765ccc0b32ad40775f017c712e6eebe04529d5b3c6a66101ce4387b2cd6328af26b059bbb4a72d3c401e41d34b";

    /**
     *  JWT stands for Json web token. Representation of representing claims to
     *  be transferred bewteen 2 parties. THe claims in jwt is encoded as json object and
     *  digitally signed using a web signature
     *
     *  Consist of three parts: Header, Payload, Signature
     *
     *  Header: Two parts
     *  Type of token
     *  Example algorithmn being used, Ex: SHA, HS256 etc
     *
     *  Payload: contains claims
     *  Claims: statement about entity typically user and additional data. Example: subject, name, iat, authorities.
     *
     *  Claims: THREE TYPES
     *  1. Registered Public - Predefined claims which are not mandatory but rec to provide set of useful and repeatable
     *  claim. ISS: issuer, Subject, Exp: expriation time etc.
     *  2. Private Claim - custom claim created to share info between parties that agree
     *  using them
     *  3. Public claim - Claim defined within IA&A registry or public by nature
     *
     *  Signature: verify sender of JWT is who they claim to be.
     *  Ensures msg aren't changed along the way.
     **/

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        Map<String , Object> extraClaims = new HashMap<>();
        if(userDetails instanceof User user){
            extraClaims.put("firstName", user.getFirstName());
            extraClaims.put("role", user.getRole().name());
        }
        return generateToken(extraClaims, userDetails);
    }



    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails){
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // expires after 24 hr
                .signWith(getSignInKey())
                .compact(); // generate and return the token
    }

    /**
     *
     * @param token: validate if token belongs to user detail
     *
     */
    public boolean checkIsTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    // Parse and verify the JWT token using our signing key, then extract all claims from the payload
    public Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyByte = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByte);
    }

}
