/**
 * Demo data used as placeholders and initial values for the blog
 */

export const title = "Elix Tesla's Digital Space.";

export const description = [
  {
    _key: "9f1a629887fd",
    _type: "block",
    children: [
      {
        _key: "4a58edd077880",
        _type: "span",
        marks: [],
        text: "A visionary blog by ",
      },
      {
        _key: "4a58edd077881",
        _type: "span",
        marks: ["elixTeslaLink"],  // Reference to the link mark
        text: "Elix Tesla",
      },
      {
        _key: "4a58edd077882",
        _type: "span",
        marks: [],
        text: " exploring digital spaces, technology, and the future.",
      },
    ],
    markDefs: [
      {
        _key: "elixTeslaLink",  // Define the link mark here
        _type: "link",
        href: "https://www.linkedin.com/in/elix-toci-590174303/", // LinkedIn URL for Elix Tesla
      },
    ],
    style: "normal",
  },
];

export const ogImageTitle = "Elix Tesla's Digital Space - A Visionary Blog for the Future";

export const ogImageUrl = "/images/elixtesla.png"; // Make sure your image is in the public folder
