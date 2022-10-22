.PHONY: all clean package

all: package

package:
	name=openinmpv-0.0.1.zip && \
	7z a -tzip $$name '-xr!*~' -'xr!.*' '-xr!*.zip' '-xr!Makefile' . && \
	7z l $$name

clean:
	-rm *.zip
