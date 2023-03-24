# Docs

Implementation Notes:

- While the chart will not render it's markup serverside I've implemented the JSON data to be fetched with the document for performance. Since the data is available at render time on the server I've added in a defer render to prevent possible SSR mismatches.
- I changed the CSV's encoding at the file level just for sake of time to UTF-8.
- I opted not to use a CSV parser for the API route formatting for time. It's a bit dirty in there and definitely would be replaced in a real world application.
- For the charting library I've added recharts which I opted not to overly customize design wise. The axis ticks and tooltips have custom formatters for large numbers and date values depending on the time frame.
- The axis domains / intervals are something that would need to be updated in a real world application. Recharts has d3 time scale compatibility, however it didn't seem like a good use of time to try to incorporate it here.
