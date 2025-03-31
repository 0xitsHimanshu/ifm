import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplacePage } from "@/components/marketplace-page"
import { ShopMarketplace } from "@/components/shop-marketplace"

export default function Marketplace() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4 bg-gray-800 border border-gray-700">
          <TabsTrigger
            value="campaigns"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/40 data-[state=active]:to-blue-500/40 data-[state=active]:text-white"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="shop"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/40 data-[state=active]:to-blue-500/40 data-[state=active]:text-white"
          >
            Shop
          </TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <MarketplacePage />
        </TabsContent>
        <TabsContent value="shop">
          <ShopMarketplace />
        </TabsContent>
      </Tabs>
    </div>
  )
}

