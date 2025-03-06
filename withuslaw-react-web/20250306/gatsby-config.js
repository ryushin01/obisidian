module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/layout.tsx"),
      },
    },
  ],
};
