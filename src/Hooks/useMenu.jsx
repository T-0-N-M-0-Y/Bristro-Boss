import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    // const [menus, setMenus] = useState([]);
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch("http://localhost:5000/menu")
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenus(data)
    //             setLoading(false)
    //         })
    //     .catch(error => console.log(error))
    // }, [])

    const { data: menus = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/menu')
            return (res.json());
        }
    })
    return [menus, loading, refetch]
}

export default useMenu;