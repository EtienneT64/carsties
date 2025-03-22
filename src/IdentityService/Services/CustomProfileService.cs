using System.Security.Claims;
using Duende.IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService(UserManager<ApplicationUser> userManager) : IProfileService
{
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await userManager.GetUserAsync(context.Subject)
            ?? throw new ArgumentException("User not available");

        var existingClaims = await userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new("username", user.UserName ?? throw new ArgumentException("Username not found"))
        };

        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name)
            ?? throw new ArgumentException("Name not found"));
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
