this.kommunikationModelForFilter.setData(this.dataForFilterKommunikation);
			var cloneDataForFilterKommunikation = cloneObject(this.dataForFilterKommunikation);
			var filterModelData = this.getView().getModel("filterModel").getData().filterKommunikation;
			var formBFilter = [];
			var nestedProtokolsFilter =
			{
				"form_c" : [],
				"form_e" : [],
				"form_f" : [],
				"form_g" : [],
				"form_i" : [],
				"form_j" : []
			};
			var filteredDataKommunikation = [];
			var filteredDataKommunikationAll = [];
			//		/filter data for filter
			for ( var currentFormularName in filterModelData)
			{
				switch (currentFormularName) {
					case "form_b":
					case "form_e":
					case "form_g":
					case "form_j":
						var currentfilterArray = [];
						if (filterModelData[currentFormularName]["filter1"])
						{
							currentfilterArray.push("N");
						}

						if (filterModelData[currentFormularName]["filter2"])
						{
							currentfilterArray.push("A");
						}

						if (filterModelData[currentFormularName]["filter3"])
						{
							currentfilterArray.push("X");
						}

						if (filterModelData[currentFormularName]["filter4"])
						{
							currentfilterArray.push("E");
							currentfilterArray.push("V");
						}

						if (filterModelData[currentFormularName]["filter5"])
						{
							currentfilterArray.push("AU");

						}
						if (filterModelData[currentFormularName]["filter6"])
						{
							currentfilterArray.push("XU");
						}

						if (filterModelData[currentFormularName]["filter7"])
						{
							currentfilterArray.push("EU");
							currentfilterArray.push("VU");
						}
						if (filterModelData[currentFormularName]["filter8"])
						{
							currentfilterArray.push("");
						}
						if (currentFormularName === "form_b")
						{
							formBFilter = currentfilterArray;
						}
						if (currentFormularName != "form_b")
						{
							nestedProtokolsFilter[currentFormularName] = currentfilterArray;
						}
						break;

					case "form_c":
					case "form_f":
					case "form_i":
						var currentfilterArray = [];
						if (filterModelData[currentFormularName]["filter1"])
						{
							currentfilterArray.push("N");
						}

						if (filterModelData[currentFormularName]["filter2"])
						{
							currentfilterArray.push("X");
						}

						if (filterModelData[currentFormularName]["filter3"])
						{
							currentfilterArray.push("V");
							currentfilterArray.push("S");
						}

						if (filterModelData[currentFormularName]["filter4"])
						{
							currentfilterArray.push("XU");
						}

						if (filterModelData[currentFormularName]["filter5"])
						{
							currentfilterArray.push("VU");
							currentfilterArray.push("EU");
						}

						if (filterModelData[currentFormularName]["filter6"])
						{
							currentfilterArray.push("");
						}

						if (currentFormularName === "form_c" || currentFormularName === "form_f" || currentFormularName === "form_i")
						{
							nestedProtokolsFilter[currentFormularName] = currentfilterArray;
						}
						break;
				}
			}

			//			filter work here:

			for (var i = 0; i < cloneDataForFilterKommunikation.length; i++)
			{
				var currentKriseFormBFormstatus = cloneDataForFilterKommunikation[i].form_b.formstatus;
				var counter = 0;
				for (var ii = 0; ii < formBFilter.length; ii++)
				{
					if (formBFilter[ii] == currentKriseFormBFormstatus)
					{
						++counter;
					}
				}
				if (counter != 0)
				{
					filteredDataKommunikation = cloneDataForFilterKommunikation[i];
					var nestedProtokols4Filter = filteredDataKommunikation.az_spez;
					var filteredNestedProtokols = [];
					//					filter for nested protocols
					for (var j = 0; j < nestedProtokols4Filter.length; j++)
					{
						var nestedFormularNames = [
								"form_c",
								"form_e",
								"form_f",
								"form_g",
								"form_i",
								"form_j" ];
						var globalCounter = 0;
						for (var jj = 0; jj < nestedFormularNames.length; jj++)
						{
							var currentNestedFormular = nestedProtokols4Filter[j][nestedFormularNames[jj]];
							var localCounter = 0;

							for (var jjj = 0; jjj < nestedProtokolsFilter[nestedFormularNames[jj]].length; jjj++)
							{
								if (nestedProtokolsFilter[nestedFormularNames[jj]][jjj] == currentNestedFormular.formstatus)
								{
									++localCounter;
								}
							}
							if (localCounter == 0)
							{
								++globalCounter;
							}
						}
						if (globalCounter == 0)
						{
							//							save current nested crisis
							filteredNestedProtokols.push(nestedProtokols4Filter[j]);
						}
					}
					filteredDataKommunikation.az_spez = filteredNestedProtokols;
					filteredDataKommunikationAll.push(filteredDataKommunikation);
				}
			}
			this.kommunikationModelForFilter.setData(filteredDataKommunikationAll);
			this.kommunikationModelForFilter.refresh(true);
			this.FilterByProtocolStatusIcon();
			this.FilterByProtocolStatusClose();