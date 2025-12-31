1. Just get the cafes nearby (includes ohoto, rating, price levels)
2. On click it should navigate you over there
3. Real Time Tracking and Crowdness Tracking
4. TTrending and Popular Cafes in that area
5. Dynamic Map + Card Integration
6. Review Sentiment Analysis

Cache results — don’t call the API on every page load if not needed (especially for photos or repeated queries).

7. b Group Meetup Planning

Feature: Users can share their location and find a midpoint cafe for group meetups.

Backend Role:

Calculate geographic midpoint between users using latitude/longitude.

Query Google Places Nearby Search for cafes near that midpoint.

Tech Stack Efficiency:

Node.js handles location math and API calls.

Backend caches results for common meetup spots, reducing repeated API calls.

Example:

Input: User1 (lat1, long1), User2 (lat2, long2)

Output: Top 3 cafes near midpoint with rating > 4


Swagger 
Stripe




1. Find API
just getting photos and little details currently
want it to add (website of location + redirect to maps)