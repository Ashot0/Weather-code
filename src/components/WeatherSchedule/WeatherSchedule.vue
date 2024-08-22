<template>
	<div>
		<canvas ref="chartCanvas"></canvas>
	</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
Chart.register(...registerables);

export default {
	setup() {
		const store = useStore();
		const hourlyData = computed(() => store.getters.hourlyData);
		const chartCanvas = ref(null);
		let chartInstance = null;

		const transformData = (data) => {
			const labels = data.map((item) =>
				format(new Date(item.dt * 1000), 'dd HH:mm')
			);
			const temperatures = data.map((item) => {
				if ('main' in item && 'temp' in item.main) {
					return item.main.temp - 273.15;
				} else if ('temp' in item) {
					return item.temp - 273.15;
				} else {
					throw new Error(
						'Unexpected data format: no temperature field found.'
					);
				}
			});

			return { labels, temperatures };
		};

		const createChart = () => {
			const { labels, temperatures } = transformData(hourlyData.value);

			if (chartInstance) {
				chartInstance.destroy();
			}

			chartInstance = new Chart(chartCanvas.value, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Temperature (°C)',
							data: temperatures,
							borderColor: 'rgba(75, 192, 192, 1)',
							backgroundColor: 'rgba(75, 192, 192, 0.2)',
							borderWidth: 1,
							fill: true,
						},
					],
				},
				options: {
					scales: {
						x: {
							title: {
								display: true,
								text: 'Time',
							},
						},
						y: {
							title: {
								display: true,
								text: 'Temperature (°C)',
							},
							beginAtZero: false,
						},
					},
				},
			});
		};

		onMounted(() => {
			createChart();
		});

		watch(hourlyData, (newData) => {
			createChart();
		});

		onBeforeUnmount(() => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		});

		return {
			chartCanvas,
		};
	},
};
</script>

<style scoped></style>
