# Python code snippets for simple, non-cryptographic hash functions.
# Do NOT use these for passwords - use a library instead.

def mod_hash(num: int) -> int:
    return num % 5

# Magic number.
DJB_IV = 5381

def djbx33a(text: str) -> int:
    # See StackOverflow 
    # https://stackoverflow.com/questions/10696223/reason-for-the-number-5381-in-the-djb-hash-function/13809282#13809282
    """
    Hashes a string using the DJB algorithm.

    Args:
        text: The string to hash.

    Returns:
        The hash value as an integer.
    """
    hash_value = DJB_IV
    for char in text:
        hash_value = (hash_value << 5) + hash_value + ord(char)
        hash_value &= 0xFFFFFFFF
    return hash_value

# Magic numbers, base 16.
FNV_PRIME_32 = 0x01000193
FNV_OFFSET_BASIS_32 = 0x811c9dc5

def fnv1a_32(data: bytes, hash_val: int = FNV_OFFSET_BASIS_32) -> int:
    """
    Computes the 32-bit FNV-1a hash of the input data.

    Args:
        data: The input data as bytes.
        hash_val: Initial hash value, default is FNV_OFFSET_BASIS_32.

    Returns:
        The 32-bit FNV-1a hash value as an integer.
    """
    for byte in data:
        hash_val ^= byte
        hash_val = (hash_val * FNV_PRIME_32) & 0xFFFFFFFF # Truncate to 32 bits
    return hash_val