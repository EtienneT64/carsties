﻿using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePriceGtZero_True()
    {
        // arrange
        var auction = new Auction { Seller = "", ReservePrice = 10 };

        // act
        var result = auction.HasReservePrice();

        // assertion
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePriceGtZero_False()
    {
        // arrange
        var auction = new Auction { Seller = "", ReservePrice = 0 };

        // act
        var result = auction.HasReservePrice();

        // assertion
        Assert.False(result);
    }
}
