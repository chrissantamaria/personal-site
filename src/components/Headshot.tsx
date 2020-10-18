import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const Headshot = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Img
      css={{ border: '6px solid white', borderRadius: '50%' }}
      fluid={data.placeholderImage.childImageSharp.fluid}
      alt="Headshot"
    />
  );
};

export default Headshot;
