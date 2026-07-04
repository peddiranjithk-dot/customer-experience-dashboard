# Customer Experience Dashboard

A front-end dashboard that visualizes customer experience metrics: CSAT, NPS,
ticket volume, sentiment, channel breakdown, recurring issues, and a live
feedback stream. Built with plain HTML, CSS, and JavaScript, using Chart.js
for the charts.

## Project structure

```
customer-experience-dashboard/
├── index.html        Page markup
├── css/
│   └── style.css      All styling (colors, layout, components)
├── js/
│   └── script.js       Chart setup + mock data + interactivity
└── README.md
```

## Running it

No build step needed. Just open `index.html` in a browser, or serve the
folder locally, e.g.:

```
cd customer-experience-dashboard
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What's on the dashboard

- **Overall CSAT** – gauge-style readout of the current customer satisfaction score
- **Signal Board** – NPS, first response time, resolution rate, escalations, churn-risk flags
- **Sentiment Mix** – donut chart of feedback sentiment (delighted → angry)
- **Ticket Volume vs. CSAT Trend** – 7-day dual-axis chart
- **Volume by Channel** – tickets broken down by chat, email, phone, social, self-serve
- **Top Recurring Issues** – table with mention counts and severity tags
- **Live Feedback Stream** – recent customer comments with sentiment markers

## Using real data

All data currently lives as JavaScript arrays/objects at the top of
`js/script.js` (`sentData`, `days`, `issues`, `feed`, etc.), plus a few
numbers hard-coded in `index.html` (like the KPI values in the Signal Board).
To connect it to a real backend:

1. Replace the mock arrays in `script.js` with a `fetch()` call to your API.
2. Keep the same data shape (e.g. `{name, value, color}` for sentiment) so
   the chart-building code doesn't need to change.
3. For the KPI numbers in the HTML, either update them server-side (if
   rendering with a templating engine) or move them into `script.js` and
   inject them into the DOM the same way the tables/lists are built.

## Customizing the look

All colors are defined as CSS variables at the top of `css/style.css`:

```css
:root{
  --ink:#0F1B1E;      /* page background */
  --panel:#16262A;    /* card background */
  --amber:#E8A23D;    /* primary accent */
  --teal:#4FA9A2;     /* positive/success accent */
  --red:#D9704F;      /* negative/critical accent */
  --fog:#7C9199;       /* muted text */
  --paper:#EDEAE2;    /* primary text */
}
```

Change these to re-theme the whole dashboard without touching layout code.
