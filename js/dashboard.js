// Melbourne Data Insights Dashboard - Epic 1.0 Population Analysis
class MelbourneInsightsDashboard {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        console.log('🚀 Initializing Melbourne Data Insights Dashboard - Epic 1.0');
        this.loadPopulationData();
        this.createCharts();
        this.showDashboard();
        console.log('✅ Epic 1.0 Dashboard loaded successfully');
    }

    loadPopulationData() {
        console.log('📊 Loading Melbourne population growth data (2015-2021)...');
        
        // Epic 1.0 - Population Growth Data from Australian Bureau of Statistics
        this.populationData = [
            { Period: "2015-2016", Previous_Population: 4289391, Current_Population: 4413357, Growth_Absolute: 123966, Growth_Rate_Percent: 2.89 },
            { Period: "2016-2017", Previous_Population: 4413357, Current_Population: 4513462, Growth_Absolute: 100105, Growth_Rate_Percent: 2.27 },
            { Period: "2017-2018", Previous_Population: 4513462, Current_Population: 4605306, Growth_Absolute: 91844, Growth_Rate_Percent: 2.03 },
            { Period: "2018-2019", Previous_Population: 4605306, Current_Population: 4691704, Growth_Absolute: 86398, Growth_Rate_Percent: 1.88 },
            { Period: "2019-2020", Previous_Population: 4691704, Current_Population: 4742942, Growth_Absolute: 51238, Growth_Rate_Percent: 1.09 },
            { Period: "2020-2021", Previous_Population: 4742942, Current_Population: 4664958, Growth_Absolute: -77984, Growth_Rate_Percent: -1.64 }
        ];

        this.summaryStats = {
            totalGrowth: 375567,
            avgAnnualGrowth: 62594,
            peakGrowthRate: 2.89,
            covidImpact: -1.64,
            analysisYears: 6
        };

        console.log('✅ Population data loaded successfully');
    }

    createCharts() {
        console.log('📈 Creating Epic 1.0 population growth visualizations...');
        this.createPopulationChart();
        this.createPopulationNumbersChart();
        this.createSimpleGrowthChart();
        this.createCovidChart();
        console.log('✅ All Epic 1.0 charts created successfully');
    }

    createPopulationChart() {
        const ctx = document.getElementById('populationChart').getContext('2d');
        
        this.charts.population = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.populationData.map(d => d.Period),
                datasets: [{
                    label: 'Growth Rate (%)',
                    data: this.populationData.map(d => d.Growth_Rate_Percent),
                    borderColor: '#0891b2',
                    backgroundColor: 'rgba(8, 145, 178, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#0891b2',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Growth Rate: ${context.parsed.y.toFixed(2)}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Growth Rate (%)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createPopulationNumbersChart() {
        const ctx = document.getElementById('populationNumbersChart').getContext('2d');
        
        const years = this.populationData.map(d => d.Period.split('-')[1]);
        const populationNumbers = this.populationData.map(d => d.Current_Population / 1000000);

        this.charts.populationNumbers = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Population (Millions)',
                    data: populationNumbers,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Population: ${context.parsed.y.toFixed(2)}M people`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Population (Millions)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createSimpleGrowthChart() {
        const ctx = document.getElementById('simpleGrowthChart').getContext('2d');
        
        this.charts.simpleGrowth = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.populationData.map(d => d.Period),
                datasets: [{
                    label: 'New Residents',
                    data: this.populationData.map(d => d.Growth_Absolute / 1000),
                    backgroundColor: this.populationData.map(d => 
                        d.Growth_Absolute > 0 ? '#10b981' : '#ef4444'
                    ),
                    borderColor: this.populationData.map(d => 
                        d.Growth_Absolute > 0 ? '#10b981' : '#ef4444'
                    ),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                return value > 0 
                                    ? `+${value.toFixed(0)}K new residents`
                                    : `${value.toFixed(0)}K population decline`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Population Change (Thousands)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    createCovidChart() {
        const ctx = document.getElementById('covidChart').getContext('2d');
        
        // Highlight COVID impact
        const covidData = this.populationData.map(d => ({
            period: d.Period,
            rate: d.Growth_Rate_Percent,
            isCovid: d.Period === '2020-2021'
        }));

        this.charts.covid = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: covidData.map(d => d.period),
                datasets: [{
                    label: 'Growth Rate (%)',
                    data: covidData.map(d => d.rate),
                    backgroundColor: covidData.map(d => 
                        d.isCovid ? '#ef4444' : '#06b6d4'
                    ),
                    borderColor: covidData.map(d => 
                        d.isCovid ? '#ef4444' : '#06b6d4'
                    ),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const period = context.label;
                                const value = context.parsed.y;
                                if (period === '2020-2021') {
                                    return `COVID Impact: ${value.toFixed(2)}% decline`;
                                }
                                return `Growth Rate: ${value.toFixed(2)}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Growth Rate (%)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    showDashboard() {
        console.log('✅ Epic 1.0 Dashboard ready - showing population insights');
        // Dashboard is always visible for Epic 1.0 - no loading states needed
    }
}

// Initialize Epic 1.0 Dashboard
document.addEventListener('DOMContentLoaded', () => {
    console.log('📊 Melbourne Data Insights - Epic 1.0 Starting...');
    new MelbourneInsightsDashboard();
});