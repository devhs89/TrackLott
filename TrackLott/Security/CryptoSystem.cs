using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;

namespace TrackLott.Security;

public static class CryptoSystem
{
  public static RsaSecurityKey GetRsaSecurityKey()
  {
    var keyPaths = KeysPath();
    // If RSA key files not exist, create them
    if (!File.Exists(keyPaths[0]))
    {
      CreateRsaKeys(keyPaths);
    }

    // Read private key file
    var privateKeyBytes = File.ReadAllBytes(keyPaths[0]);
    if (privateKeyBytes == null) throw new Exception(MessageResp.UnableToReadFileContent);
    var privateXmlString = Encoding.Default.GetString(privateKeyBytes);

    // Create & return RSA Key
    var rsa = RSA.Create();
    rsa.FromXmlString(privateXmlString);
    return new RsaSecurityKey(rsa);
  }

  private static void CreateRsaKeys(IReadOnlyList<string> keyPaths)
  {
    // Write RSA keys to files
    var rsa = RSA.Create();
    var privateXmlKey = rsa.ToXmlString(true);
    var publicXmlKey = rsa.ToXmlString(false);
    using var idRsa = File.Create(keyPaths[0]);
    using var idRsaPub = File.Create(keyPaths[1]);
    idRsa.Write(Encoding.UTF8.GetBytes(privateXmlKey));
    idRsaPub.Write(Encoding.UTF8.GetBytes(publicXmlKey));
  }

  private static string[] KeysPath()
  {
    // Get JWT encryption keys directory path
    var keysDir = Environment.GetEnvironmentVariable(EnvVarName.JwtSigningKeysDir);
    if (keysDir == null) throw new Exception(MessageResp.MissingJwtEncryptionKeysDir);

    // If JWT encryption keys directory does not exists, create one
    if (!Directory.Exists(keysDir)) Directory.CreateDirectory(keysDir);

    // Create and return RSA file paths
    const string privateRsa = "id_rsa";
    const string publicRsa = "id_rsa.pub";
    var privateKeyPath = Path.Combine(keysDir, privateRsa);
    var publicKeyPath = Path.Combine(keysDir, publicRsa);
    return new[] { privateKeyPath, publicKeyPath };
  }
}