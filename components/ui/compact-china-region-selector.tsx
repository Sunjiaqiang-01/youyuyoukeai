"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
// @ts-ignore
import * as chinaData from "china-division/dist/provinces.json";
// @ts-ignore
import * as citiesData from "china-division/dist/cities.json";
// @ts-ignore
import * as areasData from "china-division/dist/areas.json";

interface RegionItem {
  province: string;
  city: string;
  district: string;
}

interface CompactChinaRegionSelectorProps {
  value?: RegionItem[];
  onChange?: (regions: RegionItem[]) => void;
}

export function CompactChinaRegionSelector({
  value = [],
  onChange
}: CompactChinaRegionSelectorProps) {
  const [selectedRegions, setSelectedRegions] = useState<RegionItem[]>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // 获取所有省份
  const provinces = Object.values(chinaData).filter((item: any) => item.code && item.name);

  // 获取选中省份的城市
  const getCitiesForProvince = (provinceCode: string) => {
    return Object.values(citiesData).filter(
      (item: any) => item.provinceCode === provinceCode
    );
  };

  // 获取选中城市的区县
  const getAreasForCity = (cityCode: string) => {
    return Object.values(areasData).filter(
      (item: any) => item.cityCode === cityCode
    );
  };

  const selectedProvinceData = provinces.find((p: any) => p.name === selectedProvince);
  const cities = selectedProvinceData ? getCitiesForProvince(selectedProvinceData.code) : [];
  
  const selectedCityData = cities.find((c: any) => c.name === selectedCity);
  const districts = selectedCityData ? getAreasForCity(selectedCityData.code) : [];

  const handleSelectDistrict = (districtName: string) => {
    if (!selectedProvince || !selectedCity) return;

    const newRegion: RegionItem = {
      province: selectedProvince,
      city: selectedCity,
      district: districtName
    };

    // 检查是否已存在
    const exists = selectedRegions.some(
      r => r.province === newRegion.province && 
           r.city === newRegion.city && 
           r.district === newRegion.district
    );

    if (!exists) {
      const newRegions = [...selectedRegions, newRegion];
      setSelectedRegions(newRegions);
      onChange?.(newRegions);
    }

    // 重置选择
    setSelectedProvince("");
    setSelectedCity("");
    setIsOpen(false);
  };

  const removeRegion = (index: number) => {
    const newRegions = selectedRegions.filter((_, i) => i !== index);
    setSelectedRegions(newRegions);
    onChange?.(newRegions);
  };

  useEffect(() => {
    setSelectedRegions(value);
  }, [value]);

  return (
    <div className="w-full space-y-3">
      {/* 选择按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0a1420] border border-[#162332] hover:border-[#2a2a2a] transition-colors"
      >
        <span className="text-text-secondary text-sm">
          {selectedRegions.length > 0 ? `已选 ${selectedRegions.length} 个地区` : '选择省市区'}
        </span>
        <ChevronDown className={`size-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 下拉选择面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#0a1420] border border-[#162332]">
              {/* 省份列 */}
              <div className="space-y-1">
                <div className="text-xs text-white font-semibold mb-2 px-2">省份</div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                  {provinces.map((province: any) => (
                    <button
                      key={province.code}
                      onClick={() => {
                        setSelectedProvince(province.name);
                        setSelectedCity("");
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                        selectedProvince === province.name
                          ? 'bg-[#06d6a0]/20 text-[#06d6a0] font-bold'
                          : 'text-white font-medium hover:bg-[#162332]'
                      }`}
                    >
                      {province.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 城市列 */}
              <div className="space-y-1">
                <div className="text-xs text-white font-semibold mb-2 px-2">城市</div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                  {cities.length > 0 ? (
                    cities.map((city: any) => (
                      <button
                        key={city.code}
                        onClick={() => setSelectedCity(city.name)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                          selectedCity === city.name
                            ? 'bg-[#06d6a0]/20 text-[#06d6a0] font-bold'
                            : 'text-white font-medium hover:bg-[#162332]'
                        }`}
                      >
                        {city.name}
                      </button>
                    ))
                  ) : (
                    <div className="text-xs text-[#5a5a5a] px-2 py-4 text-center">
                      请先选择省份
                    </div>
                  )}
                </div>
              </div>

              {/* 区县列 */}
              <div className="space-y-1">
                <div className="text-xs text-white font-semibold mb-2 px-2">区县</div>
                <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                  {districts.length > 0 ? (
                    districts.map((district: any) => (
                      <button
                        key={district.code}
                        onClick={() => handleSelectDistrict(district.name)}
                        className="w-full text-left px-2 py-1.5 rounded text-xs text-white font-medium hover:bg-[#162332] hover:text-[#06d6a0] transition-colors"
                      >
                        {district.name}
                      </button>
                    ))
                  ) : (
                    <div className="text-xs text-[#5a5a5a] px-2 py-4 text-center">
                      请先选择城市
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 已选标签 */}
      {selectedRegions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRegions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#06d6a0]/20 to-[#00b4d8]/20 border border-[#06d6a0]/30 rounded-lg"
            >
              <span className="text-xs text-[#06d6a0]">
                {region.province}{'>'}{region.city}{'>'}{region.district}
              </span>
              <button
                onClick={() => removeRegion(index)}
                className="p-0.5 rounded-full hover:bg-[#06d6a0]/20"
              >
                <X className="size-3 text-[#06d6a0]" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

