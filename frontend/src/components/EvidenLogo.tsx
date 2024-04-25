interface EvidenLogoProps {
    height?: number
}

const EvidenLogo = ({ height = 30 }: EvidenLogoProps): React.ReactElement => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <img src="/logo512.png" alt="Eviden Logo" height={height} />
        </div>
    )
}

export default EvidenLogo
