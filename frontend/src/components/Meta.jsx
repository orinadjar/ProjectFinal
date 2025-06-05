import { Helmet } from "react-helmet-async"


const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Walcome to Originals",
    description: "We sell the best products for cheap",
    keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta
