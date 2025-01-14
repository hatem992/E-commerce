import useOnline from '../../hooks/useOnline.jsx'

export default function Offline({children}) {
    let isOnline = useOnline()
    if (!isOnline) {
        return children
    }
}
