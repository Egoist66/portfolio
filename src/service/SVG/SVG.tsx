type SVGElementProps = {
    width: string,
    height: string,
    params: {
        path: string,
        id: string
    }
}

function SVG({width, height, params} : SVGElementProps) {
    return (
        <svg width={width} height={height}>
            <use xlinkHref={`${params.path}${params.id}`} />
        </svg>
    )
}

export default SVG