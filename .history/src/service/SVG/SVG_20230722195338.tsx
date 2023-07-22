type SVGElementProps = {
    width: string,
    height: string,
    url: string
}

function SVG({width, height, url} : SVGElementProps) {
    return (
        <svg width={width} height={height}>
            <use xlinkHref={`${url}`} />
        </svg>
    )
}

export default SVG