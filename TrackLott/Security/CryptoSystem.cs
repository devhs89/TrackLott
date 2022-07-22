using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;

namespace TrackLott.Security;

public static class CryptoSystem
{
  public static RsaSecurityKey GetRsaSecurityKey()
  {
    CreateRsaKeys();

    var keyPaths = KeyPaths();
    var privateKeyBytes = File.ReadAllBytes(keyPaths[0]);
    if (privateKeyBytes == null) throw new Exception(MessageResp.UnableToReadFileContent);
    var privateXmlString = Encoding.Default.GetString(privateKeyBytes);

    var rsa = RSA.Create();
    rsa.FromXmlString(privateXmlString);
    return new RsaSecurityKey(rsa);
  }

  private static void CreateRsaKeys()
  {
    var keyPaths = KeyPaths();
    if (File.Exists(keyPaths[0])) return;

    var rsa = RSA.Create();
    var privateXmlKey = rsa.ToXmlString(true);
    var publicXmlKey = rsa.ToXmlString(false);
    using var idRsa = File.Create(keyPaths[0]);
    using var idRsaPub = File.Create(keyPaths[1]);
    idRsa.Write(Encoding.Default.GetBytes(privateXmlKey));
    idRsaPub.Write(Encoding.Default.GetBytes(publicXmlKey));
  }

  private static string[] KeyPaths()
  {
    var jwtKeysDir = Environment.GetEnvironmentVariable(EnvVarName.TracklottAuthKeysDir);
    if (jwtKeysDir == null) throw new Exception(MessageResp.MissingSecurityKeysDir);

    if (!Directory.Exists(jwtKeysDir)) Directory.CreateDirectory(jwtKeysDir);

    const string privateRsa = "id_rsa";
    const string publicRsa = "id_rsa.pub";
    var privateKeyPath = Path.Combine(jwtKeysDir, privateRsa);
    var publicKeyPath = Path.Combine(jwtKeysDir, publicRsa);

    return new[] { privateKeyPath, publicKeyPath };
  }
}