using System.Security.Claims;

namespace AuctionService.IntegrationTests.Util;

public static class AuthHelper
{
    public static Dictionary<string, object> GetBearerForUser(string username)
    {
        return new Dictionary<string, object> { { ClaimTypes.Name, username } };
    }
}
