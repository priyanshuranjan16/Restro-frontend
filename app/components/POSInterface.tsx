import Image from "next/image";

export default function POSInterface() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="relative font-caveat">
              An interface for efficient and fast service
              <span className="absolute -bottom-2 left-[400px] w-[200px] h-3 bg-blue-500 transform -skew-x-12 opacity-80"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience lightning-fast ordering with our intuitive POS system designed for modern restaurants
          </p>
        </div>

        {/* POS Interface Display */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          {/* Interface Image */}
          <div className="relative">
            <Image
              src="/foodinterface.png"
              alt="RestroSphere POS Interface"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            
            {/* Feature Annotations with Odoo Arrow */}
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <div className="bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium text-yellow-800">
                Start/Pause Commands
              </div>
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform rotate-45"
              />
            </div>
            
            <div className="absolute top-24 left-8 flex items-center gap-2">
              <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-medium text-green-800">
                Loyalty programs
              </div>
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform rotate-45"
              />
            </div>
            
            <div className="absolute top-36 left-8 flex items-center gap-2">
              <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
                Notes
              </div>
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform rotate-45"
              />
            </div>
            
            <div className="absolute top-48 left-8 flex items-center gap-2">
              <div className="bg-purple-100 px-3 py-1 rounded-full text-sm font-medium text-purple-800">
                Divide the bill
              </div>
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform rotate-45"
              />
            </div>
            
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform -rotate-45"
              />
              <div className="bg-orange-100 px-3 py-1 rounded-full text-sm font-medium text-orange-800">
                Reliable online and offline
              </div>
            </div>
            
            <div className="absolute top-20 right-8 flex items-center gap-2">
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform -rotate-45"
              />
              <div className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-800">
                Filter by product categories
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex items-center gap-2">
              <img 
                src="https://odoocdn.com/openerp_website/static/src/img/arrows/grey_arrow_sm_03.svg" 
                alt="arrow" 
                className="w-6 h-6 transform -rotate-45"
              />
              <div className="bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-indigo-800">
                Intuitive display
              </div>
            </div>
          </div>
        </div>

        
        
        
          
          
      </div>
    </section>
  );
}
