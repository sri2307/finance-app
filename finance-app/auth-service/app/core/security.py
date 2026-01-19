# app/core/security.py
from jose import jwt
from fastapi import HTTPException
import httpx

async def validate_entra_token(token: str, tenant_id: str, client_id: str):
    """
    Validates a Microsoft Entra ID token by fetching public keys from Azure.
    """
    try:
        # 1. Fetch Microsoft's Public Keys (JWKS)
        jwks_url = f"https://login.microsoftonline.com/{tenant_id}/discovery/v2.0/keys"
        async with httpx.AsyncClient() as client:
            response = await client.get(jwks_url)
            jwks = response.json()

        # 2. Extract the Key ID (kid) from the incoming token header
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}

        # 3. Find the matching key in Microsoft's list
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break
        
        if not rsa_key:
             raise HTTPException(status_code=401, detail="Token key not found in JWKS")

        # 4. Decode & Validate Signature
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=client_id,
            options={"verify_at_hash": False}
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError as e:
        print(f"JWT Error: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid Token")
    except Exception as e:
        print(f"Generic Error: {str(e)}")
        raise HTTPException(status_code=401, detail="Authentication Failed")