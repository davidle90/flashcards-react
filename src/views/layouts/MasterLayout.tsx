import { Outlet } from "react-router-dom"
import SiteFooter from "../../components/SiteFooter/SiteFooter"
import SiteHeader from "../../components/SiteHeader/SiteHeader"

function MasterLayout() {

  return (
    <>
        <div className="h-screen flex flex-col justify-between">
            <SiteHeader />
                <main className="grow">
                    <div className="container mx-auto pu-6">
                        <Outlet />
                    </div>
                </main>
            <SiteFooter />
        </div>
    </>
  )
}

export default MasterLayout