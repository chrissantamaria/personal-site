module.exports = {
  siteMetadata: {
    title: `Chris Santamaria`,
    description: `Student, fullstack web developer and avid learner`,
    author: `Chris Santamaria <chris@santamaria.me>`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chris Santamaria`,
        start_url: `/`,
        icon: `src/images/favicon.png`,
        background_color: `#543f79`,
        theme_color: `#543f79`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-preact`,
  ],
};
