using System.Security.Cryptography;
using System.Text;
using TrackLott.Constants;

namespace TrackLott.Data;

public static class SecurityKey
{
  public static async Task Create()
  {
    var jwtKeysDir = Environment.GetEnvironmentVariable(EnvVarName.JwtKeysDir);
    if (jwtKeysDir == null) throw new Exception(ErrorResponse.MissingSecurityKeysDir);

    var privateKeyPath = Path.Combine(jwtKeysDir, SecurityKeyName.PrivateRsa);
    var publicKeyPath = Path.Combine(jwtKeysDir, SecurityKeyName.PublicRsa);

    if (File.Exists(privateKeyPath)) return;
    if (!Directory.Exists(jwtKeysDir)) Directory.CreateDirectory(jwtKeysDir);

    var rsa = RSA.Create();
    var privateXmlKey = rsa.ToXmlString(true);
    var publicXmlKey = rsa.ToXmlString(false);
    await using var idRsa = File.Create(privateKeyPath);
    await using var idRsaPub = File.Create(publicKeyPath);
    var valueTask1 = idRsa.WriteAsync(Encoding.UTF8.GetBytes(privateXmlKey));
    var valueTask2 = idRsaPub.WriteAsync(Encoding.UTF8.GetBytes(publicXmlKey));
  }
}