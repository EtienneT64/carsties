using System;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
{
    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(x => x.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();

        var items = await httpClient.GetFromJsonAsync<List<Item>>(config["AuctionServiceUrl"]
            + "/api/auctions?date=" + lastUpdated)
            ?? throw new InvalidOperationException("Could not retrieve items from the Auction Service.");
        return items;
    }
}
